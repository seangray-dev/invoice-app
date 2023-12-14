import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  User,
} from './definitions';
import { formatCurrency, formatDateToLocal } from './functions';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchHeaderData() {
  const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
  const data = await Promise.all([invoiceCountPromise]);
  const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
  return numberOfInvoices;
}

export async function fetchAllInvoices() {
  try {
    const result = await sql`
      SELECT 
        i.id, 
        c.name AS client_name, 
        i.payment_due AS due_date, 
        i.status, 
        i.total AS amount 
      FROM 
        invoices i
      JOIN 
        clients c ON i.client_id = c.id`;
    return result.rows.map((row) => ({
      id: row.id,
      clientName: row.client_name,
      dueDate: formatDateToLocal(row.due_date),
      status: row.status,
      amount: formatCurrency(row.amount),
    }));
  } catch (error) {
    console.log('Error fetching invoices', error);

    throw Error;
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    // Fetch the main invoice details along with client information
    const invoiceResult = await sql`
      SELECT
        i.id,
        i.created_at,
        i.payment_due,
        i.description,
        i.payment_terms,
        i.status,
        i.total,
        c.name AS client_name,
        c.email AS client_email,
        c.street AS client_street,
        c.city AS client_city,
        c.postal_code AS client_postal_code,
        c.country AS client_country,
        sa.street AS sender_street,
        sa.city AS sender_city,
        sa.postal_code AS sender_postal_code,
        sa.country AS sender_country
      FROM
        invoices i
      JOIN
        clients c ON i.client_id = c.id
      LEFT JOIN
        sender_addresses sa ON i.id = sa.invoice_id
      WHERE
        i.id = ${id}`;

    // Check if the invoice exists
    if (invoiceResult.rows.length === 0) {
      return null;
    }

    const invoice = invoiceResult.rows[0];

    // Fetch items for the invoice
    const itemsResult = await sql`
      SELECT
        name,
        quantity,
        price,
        total
      FROM
        items
      WHERE
        invoice_id = ${id}`;

    return {
      id: invoice.id,
      createdAt: formatDateToLocal(invoice.created_at),
      paymentDue: formatDateToLocal(invoice.payment_due),
      description: invoice.description,
      paymentTerms: invoice.payment_terms,
      clientName: invoice.client_name,
      clientEmail: invoice.client_email,
      status: invoice.status,
      senderAddress: {
        street: invoice.sender_street,
        city: invoice.sender_city,
        postCode: invoice.sender_postal_code,
        country: invoice.sender_country,
      },
      clientAddress: {
        street: invoice.client_street,
        city: invoice.client_city,
        postCode: invoice.client_postal_code,
        country: invoice.client_country,
      },
      items: itemsResult.rows.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      total: formatCurrency(invoice.total),
    };
  } catch (error) {
    console.log('Error fetching invoice by ID', error);
    throw error;
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

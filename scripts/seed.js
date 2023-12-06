const { db } = require('@vercel/postgres');
const { invoices } = require('./data');

async function createTables(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  const createInvoiceTables = await client.sql`
    CREATE TABLE IF NOT EXISTS "invoices" (
      id VARCHAR PRIMARY KEY,
      client_id UUID NOT NULL,
      created_at DATE NOT NULL,
      payment_due DATE NOT NULL,
      description VARCHAR NOT NULL,
      payment_terms INT NOT NULL,
      status VARCHAR NOT NULL,
      total DECIMAL NOT NULL
    );
  `;

  const createSenderAdressTable = await client.sql`
    CREATE TABLE IF NOT EXISTS "sender_addresses" (
      invoice_id VARCHAR,
      street VARCHAR NOT NULL,
      city VARCHAR NOT NULL,
      postal_code VARCHAR(255),
      country VARCHAR NOT NULL,
      PRIMARY KEY (invoice_id),
      FOREIGN KEY (invoice_id) REFERENCES invoices (id)
    );
  `;

  const createClientsTable = await client.sql`
  CREATE TABLE IF NOT EXISTS "clients" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    street VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(255),
    country VARCHAR(255)
  );
`;

  const createItemsTable = await client.sql`
    CREATE TABLE IF NOT EXISTS "items" (
      invoice_id VARCHAR,
      name VARCHAR NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL NOT NULL,
      total DECIMAL NOT NULL,
      PRIMARY KEY (invoice_id, name),
      FOREIGN KEY (invoice_id) REFERENCES invoices (id)
    );
  `;
  return (
    createItemsTable,
    createClientsTable,
    createSenderAdressTable,
    createInvoiceTables
  );
}

async function seedDatabase() {
  const client = await db.connect();
  const clientIdsByEmail = new Map();

  try {
    await createTables(client);

    for (const invoice of invoices) {
      let clientId;
      if (!clientIdsByEmail.has(invoice.clientEmail)) {
        const insertResult = await client.sql`
          INSERT INTO clients (name, email, street, city, postal_code, country)
          VALUES (${invoice.clientName}, ${invoice.clientEmail}, ${invoice.clientAddress.street}, ${invoice.clientAddress.city}, ${invoice.clientAddress.postCode}, ${invoice.clientAddress.country})
          ON CONFLICT (email) DO NOTHING
          RETURNING id;
        `;
        clientId = insertResult.rows[0]?.id;
        clientIdsByEmail.set(invoice.clientEmail, clientId);
      } else {
        clientId = clientIdsByEmail.get(invoice.clientEmail);
      }

      await client.sql`
        INSERT INTO invoices (id, created_at, payment_due, description, payment_terms, client_id, status, total)
        VALUES (${invoice.id}, ${invoice.createdAt}, ${invoice.paymentDue}, ${invoice.description}, ${invoice.paymentTerms}, ${clientId}, ${invoice.status}, ${invoice.total})
        ON CONFLICT (id) DO NOTHING;
      `;

      await client.sql`
        INSERT INTO sender_addresses (invoice_id, street, city, postal_code, country)
        VALUES (${invoice.id}, ${invoice.senderAddress.street}, ${invoice.senderAddress.city}, ${invoice.senderAddress.postCode}, ${invoice.senderAddress.country})
        ON CONFLICT (invoice_id) DO NOTHING;
      `;

      for (const item of invoice.items) {
        await client.sql`
          INSERT INTO items (invoice_id, name, quantity, price, total)
          VALUES (${invoice.id}, ${item.name}, ${item.quantity}, ${item.price}, ${item.total})
          ON CONFLICT (invoice_id, name) DO NOTHING;
        `;
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await client.end();
  }
}

seedDatabase().catch((error) => {
  console.error('Failed to seed database:', error);
});

const { db } = require('@vercel/postgres');
const { invoices } = require('./data');

async function createTables(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  const createInvoiceTables = await client.sql`
    CREATE TABLE IF NOT EXISTS "invoices" (
      id VARCHAR PRIMARY KEY,
      createdAt DATE NOT NULL,
      paymentDue DATE NOT NULL,
      description VARCHAR NOT NULL,
      paymentTerms INT NOT NULL,
      clientName VARCHAR NOT NULL,
      clientEmail VARCHAR NOT NULL,
      status VARCHAR NOT NULL,
      total DECIMAL NOT NULL
    );
  `;

  const createSenderAdressTable = await client.sql`
    CREATE TABLE IF NOT EXISTS "sender_addresses" (
      invoiceId VARCHAR,
      street VARCHAR NOT NULL,
      city VARCHAR NOT NULL,
      postCode VARCHAR NOT NULL,
      country VARCHAR NOT NULL,
      PRIMARY KEY (invoiceId),
      FOREIGN KEY (invoiceId) REFERENCES invoices (id)
    );
  `;

  const createClientsTable = await client.sql`
  CREATE TABLE IF NOT EXISTS "clients" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    street VARCHAR(255),
    city VARCHAR(255),
    postCode VARCHAR(255),
    country VARCHAR(255)
  );
`;

  const createItemsTable = await client.sql`
    CREATE TABLE IF NOT EXISTS "items" (
      invoiceId VARCHAR,
      name VARCHAR NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL NOT NULL,
      total DECIMAL NOT NULL,
      PRIMARY KEY (invoiceId, name),
      FOREIGN KEY (invoiceId) REFERENCES invoices (id)
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
  const uniqueClients = new Map();

  try {
    await createTables(client);

    for (const invoice of invoices) {
      if (!uniqueClients.has(invoice.clientEmail)) {
        uniqueClients.set(invoice.clientEmail, true);
        await client.sql`
          INSERT INTO clients (name, email, street, city, postCode, country)
          VALUES (${invoice.clientName}, ${invoice.clientEmail}, ${invoice.clientAddress.street}, ${invoice.clientAddress.city}, ${invoice.clientAddress.postCode}, ${invoice.clientAddress.country})
          ON CONFLICT (email) DO NOTHING;
        `;
      }
      await client.sql`
        INSERT INTO invoices (id, createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, status, total)
        VALUES (${invoice.id}, ${invoice.createdAt}, ${invoice.paymentDue}, ${invoice.description}, ${invoice.paymentTerms}, ${invoice.clientName}, ${invoice.clientEmail}, ${invoice.status}, ${invoice.total})
        ON CONFLICT (id) DO NOTHING;
      `;

      await client.sql`
        INSERT INTO sender_addresses (invoiceId, street, city, postCode, country)
        VALUES (${invoice.id}, ${invoice.senderAddress.street}, ${invoice.senderAddress.city}, ${invoice.senderAddress.postCode}, ${invoice.senderAddress.country})
        ON CONFLICT (invoiceId) DO NOTHING;
      `;

      for (const item of invoice.items) {
        await client.sql`
          INSERT INTO items (invoiceId, name, quantity, price, total)
          VALUES (${invoice.id}, ${item.name}, ${item.quantity}, ${item.price}, ${item.total})
          ON CONFLICT (invoiceId, name) DO NOTHING;
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

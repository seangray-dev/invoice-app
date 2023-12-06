const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const { invoices } = require('./data');

async function createTables(client) {
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

  const createClientAdressTable = await client.sql`
    CREATE TABLE IF NOT EXISTS "client_addresses" (
      invoiceId VARCHAR,
      street VARCHAR NOT NULL,
      city VARCHAR NOT NULL,
      postCode VARCHAR NOT NULL,
      country VARCHAR NOT NULL,
      PRIMARY KEY (invoiceId),
      FOREIGN KEY (invoiceId) REFERENCES invoices (id)
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
    createClientAdressTable,
    createSenderAdressTable,
    createInvoiceTables
  );
}

async function seedDatabase() {
  const client = await db.connect();

  try {
    await createTables(client);

    for (const invoice of invoices) {
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

      await client.sql`
        INSERT INTO client_addresses (invoiceId, street, city, postCode, country)
        VALUES (${invoice.id}, ${invoice.clientAddress.street}, ${invoice.clientAddress.city}, ${invoice.clientAddress.postCode}, ${invoice.clientAddress.country})
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

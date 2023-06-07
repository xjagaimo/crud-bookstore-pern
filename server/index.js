const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create
app.post('/book', async(req, res) => {
  try {
    const { id } = req.params;
    const { book_isbn, book_name, pages, book_desc, price, language_id, publisher_id, category_id, last_update, image_url, publication_year } = req.body;

    const addBook = await pool.query(
      "INSERT INTO Book (book_isbn, book_name, pages, book_desc, price, language_id, publisher_id, category_id, last_update, image_url, publication_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10) RETURNING *",
      [book_isbn, book_name, pages, book_desc, price, language_id, publisher_id, category_id, image_url, publication_year]
    );

    res.json(addBook.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/category', async(req, res) => {
  try {
    const { id } = req.params;
    const { category_name, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO category (category_name, last_update) VALUES ($1, NOW()) RETURNING *",
      [category_name]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/address', async(req, res) => {
  try {
    const { id } = req.params;
    const { address, city, country, postal_code, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO address (address, city, country, postal_code, last_update) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [address, city, country, postal_code]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/author', async(req, res) => {
  try {
    const { id } = req.params;
    const { author_name, year_born, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO author (author_name, year_born, last_update) VALUES ($1, $2, NOW()) RETURNING *",
      [author_name, year_born]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/customer', async(req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, store_id, address_id, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO customer (customer_name, store_id, address_id, last_update) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [customer_name, store_id, address_id]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/inventory', async(req, res) => {
  try {
    const { id } = req.params;
    const { book_id, store_id, quantity, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO inventory (book_id, store_id, quantity, last_update) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [book_id, store_id, quantity]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/language', async(req, res) => {
  try {
    const { id } = req.params;
    const { language, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO language (language, last_update) VALUES ($1, NOW()) RETURNING *",
      [language]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/publisher', async(req, res) => {
  try {
    const { id } = req.params;
    const { publisher_name, address_id, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO publisher (publisher_name, address_id, last_update) VALUES ($1, $2, NOW()) RETURNING *",
      [publisher_name, address_id]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/purchase', async(req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, purchase_date, store_id, staff_id, inventory_id, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO purchase (customer_id, purchase_date, store_id, staff_id, inventory_id, last_update) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      [customer_id, purchase_date, store_id, staff_id, inventory_id]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/review', async(req, res) => {
  try {
    const { id } = req.params;
    const { book_id, customer_id, rating, review, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO review (book_id, customer_id, rating, review, last_update) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [book_id, customer_id, rating, review]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/staff', async(req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, address_id, store_id, picture_url, position, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO staff (first_name, last_name, address_id, store_id, picture_url, position, last_update) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *",
      [first_name, last_name, address_id, store_id, picture_url, position]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/store', async(req, res) => {
  try {
    const { id } = req.params;
    const { address_id, last_update } = req.body;

    const add = await pool.query(
      "INSERT INTO store (address_id, last_update) VALUES ($1, NOW()) RETURNING *",
      [address_id]
    );

    res.json(add.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all
app.get("/author", async(req, res) => {
    try {
        const allAuthors = await pool.query("SELECT * FROM author");
        res.json(allAuthors.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/address", async(req, res) => {
  try {
      const allAddress = await pool.query("SELECT * FROM address");
      res.json(allAddress.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/book", async(req, res) => {
    try {
        const allBooks = await pool.query("SELECT * FROM Book");
        res.json(allBooks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/category", async(req, res) => {
  try {
      const allCategories = await pool.query("SELECT * FROM Category");
      res.json(allCategories.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/customer", async(req, res) => {
  try {
      const allCustomer = await pool.query("SELECT * FROM Customer");
      res.json(allCustomer.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/inventory", async(req, res) => {
  try {
      const allInventory = await pool.query("SELECT * FROM inventory");
      res.json(allInventory.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/language", async(req, res) => {
  try {
      const allLanguage = await pool.query("SELECT * FROM language");
      res.json(allLanguage.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/publisher", async(req, res) => {
  try {
      const allPublisher = await pool.query("SELECT * FROM publisher");
      res.json(allPublisher.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/purchase", async(req, res) => {
  try {
      const allPurchase = await pool.query("SELECT * FROM purchase");
      res.json(allPurchase.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/review", async(req, res) => {
  try {
      const allReview = await pool.query("SELECT * FROM review");
      res.json(allReview.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/staff", async(req, res) => {
  try {
      const allStaff = await pool.query("SELECT * FROM staff");
      res.json(allStaff.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/store", async(req, res) => {
  try {
      const allStore = await pool.query("SELECT * FROM store");
      res.json(allStore.rows);
  } catch (err) {
      console.error(err.message);
  }
});

//update
app.put("/book/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { book_isbn, book_name, pages, book_desc, price, language_id, publisher_id, category_id, last_update, image_url, publication_year } = req.body;

      const updateBook = await pool.query(
        "UPDATE Book SET book_isbn = $2 ,book_name = $3 ,pages = $4 ,book_desc=$5 ,price=$6 ,language_id=$7 ,publisher_id=$8 ,category_id=$9 ,last_update= NOW() ,image_url=$10 ,publication_year=$11  WHERE book_id = $1",
        [id, book_isbn, book_name, pages, book_desc, price, language_id, publisher_id, category_id, image_url, publication_year]
      );
  
      const selectItem = await pool.query(
        "SELECT * FROM book WHERE book_id = $1",
        [id]
      )
  
      res.json(selectItem.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

app.put("/category/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, last_update } = req.body;

      const updateBook = await pool.query(
        "UPDATE category SET category_name = $2, last_update = NOW() WHERE category_id = $1",
        [id, category_name]
      );

      const selectItem = await pool.query(
        "SELECT * FROM category WHERE category_id = $1",
        [id]
      )
  
      res.json(selectItem.rows[0]);
      // console.log(selectItem);
    } catch (err) {
      console.error(err.message);
    }
});

app.put("/address/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { address, city, country, postal_code, last_update } = req.body;

    const update = await pool.query(
      "UPDATE address SET address = $2, city=$3, country=$4, postal_code=$5, last_update = NOW() WHERE address_id = $1",
      [id, address, city, country, postal_code]
    );

    const selectItem = await pool.query(
      "SELECT * FROM address WHERE address_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);  
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/author/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { author_name, year_born, last_update } = req.body;

    const update = await pool.query(
      "UPDATE author SET author_name=$2, year_born=$3, last_update=NOW() WHERE author_id=$1",
      [id, author_name, year_born]
    );

    const selectItem = await pool.query(
      "SELECT * FROM author WHERE author_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/customer/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, store_id, address_id, last_update } = req.body;

    const update = await pool.query(
      "UPDATE customer SET customer_name=$2, store_id=$3, address_id=$4, last_update=NOW() WHERE customer_id=$1",
      [id, customer_name, store_id, address_id]
    );

    const selectItem = await pool.query(
      "SELECT * FROM customer WHERE customer_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/inventory/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { book_id, store_id, quantity, last_update } = req.body;

    const add = await pool.query(
      "UPDATE inventory SET book_id=$2, store_id=$3, quantity=$4, last_update=NOW() WHERE inventory_id=$1",
      [id, book_id, store_id, quantity]
    );

    const selectItem = await pool.query(
      "SELECT * FROM inventory WHERE inventory_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

app.put('/language/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { language, last_update } = req.body;

    const add = await pool.query(
      "UPDATE language SET language=$2, last_update=NOW() WHERE language_id=$1",
      [id, language]
    );

    const selectItem = await pool.query(
      "SELECT * FROM language WHERE language_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/publisher/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { publisher_name, address_id, last_update } = req.body;

    const add = await pool.query(
      "UPDATE publisher SET publisher_name=$2, address_id=$3, last_update=NOW() WHERE publisher_id=$1",
      [id, publisher_name, address_id]
    );

    const selectItem = await pool.query(
      "SELECT * FROM publisher WHERE publisher_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/purchase/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, purchase_date, store_id, staff_id, inventory_id, last_update } = req.body;

    const add = await pool.query(
      "UPDATE purchase SET customer_id=$2, purchase_date=$3, store_id=$4, staff_id=$5, inventory_id=$6, last_update=NOW() WHERE purchase_id=$1",
      [id, customer_id, purchase_date, store_id, staff_id, inventory_id]
    );

    const selectItem = await pool.query(
      "SELECT * FROM purchase WHERE purchase_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/review/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { book_id, customer_id, rating, review, last_update } = req.body;

    const add = await pool.query(
      "UPDATE review SET book_id=$2, customer_id=$3, rating=$4, review=$5, last_update=NOW() WHERE review_id= $1",
      [id, book_id, customer_id, rating, review, last_update]
    );

    const selectItem = await pool.query(
      "SELECT * FROM review WHERE review_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/staff/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, address_id, store_id, picture_url, position, last_update } = req.body;

    const add = await pool.query(
      "UPDATE staff SET first_name=$2, last_name=$3, address_id=$4, store_id=$5, picture_url=$6, position=$7, last_update=NOW() WHERE staff_id= $1",
      [id, first_name, last_name, address_id, store_id, picture_url, position]
    );

    const selectItem = await pool.query(
      "SELECT * FROM staff WHERE staff_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

app.put('/store/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { address_id, last_update } = req.body;

    const add = await pool.query(
      "UPDATE store (address_id, last_update) VALUES ($1, NOW()) RETURNING *",
      [address_id]
    );

    const selectItem = await pool.query(
      "SELECT * FROM store WHERE store_id = $1",
      [id]
    )

    res.json(selectItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete
app.delete("/book/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteBook = await pool.query("DELETE FROM Book WHERE book_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });

  app.delete("/category/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM category WHERE category_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });

  app.delete("/address/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM address WHERE address_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });

  app.delete("/author/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM author WHERE author_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/customer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM customer WHERE customer_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/inventory/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM inventory WHERE inventory_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/language/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM language WHERE language_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/publisher/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM publisher WHERE publisher_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/purchase/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM purchase WHERE purchase_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/review/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM review WHERE review_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });

  app.delete("/staff/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM staff WHERE staff_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.delete("/store/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const del = await pool.query("DELETE FROM store WHERE store_id = $1", [
        id
      ]);
      res.json(id);
    } catch (err) {
      console.log(err.message);
    }
  });
  
app.listen(5000, () => {
    console.log("server has started on port 5000");
});
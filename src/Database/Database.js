import * as SQLite from "expo-sqlite";

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};


// useEffect(() => {
//   db.transaction(function (tx) {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS products(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(30), product_price VARCHAR(15), product_info VARCHAR(200), product_image VARCHAR(200))",
//       [],
//       (tx, results) => {
//         // enterProducts.forEach((product) => dbAddProducts(product.productName, product.price, product.description, product.pictureURL))
//         console.log("Table created successfully");
//       }
//     );
//   });
// }, []);

// db.transaction(function (tx) {
//   tx.executeSql("SELECT * FROM products", [], (tx, results) => {
//     for (let i = 0; i < results.rows.length; i++) {
//       temp.push(results.rows.item(i));
//     }
//     setFlatListItems(temp);
//     console.log(results);
//   });

import * as SQLite from "expo-sqlite";

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};


// useEffect(() => {
//   db.transaction(function (tx) {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS products(productID INTEGER PRIMARY KEY AUTOINCREMENT, productName VARCHAR(30), productPrice VARCHAR(15), productInfo VARCHAR(200), productImage VARCHAR(200))",
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



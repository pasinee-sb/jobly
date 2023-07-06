const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/*update data in sql ,  dataToUpdate retrieves data in object pairs
jsToSql object property name in js corresponding to sql column names*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  //if no dataToUpdate keys detected then there is no data to update, throw error
  if (keys.length === 0) throw new BadRequestError("No data");

  //mapping out an array of key names to update in sql columns from keys in dataToUpdate object
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    //colName is current js property name, idx is index
    //jsToSql[colName] used to access js object value corresponding to colName, if that value is available, it will retrieve that
    //value as column name
    //or else we will use colName as column name
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );
  //returns setCols - columns to update and values to update to
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

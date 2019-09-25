const user = require("../models/user");
let Validator = require('fastest-validator');


let customers = {};
let counter = 0;

/* create an instance of the validator */
let userValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* customer validator shema */
const userVSchema = {
  guid: {type: "string", min: 3},
  first_name: { type: "string", min: 1, max: 50, pattern: namePattern},
  last_name: { type: "string", min: 1, max: 50, pattern: namePattern},
  email: { type: "email", max: 75 },
  zipcode: { type: "string", max: 5, pattern: zipCodePattern},

  password: { type: "string", min: 2, max: 50, pattern: passwordPattern}
};


/* static customer service class */
class UserService
{
  static create(data)
  {
    var vres = userValidator.validate(data, userVSchema);

    /* validation failed */
    if(!(vres === true))
    {
      let errors = {}, item;

      for(const index in vres)
      {
        item = vres[index];

        errors[item.field] = item.message;
      }

      throw {
        name: "ValidationError",
        message: errors
      };
    }

    let customer = new user(data.first_name, data.last_name, data.email, data.zipcode, data.password);

    customer.uid = 'c' + counter++;

    customers[customer.uid] = customer;

    return customer;
  }

  static retrieve(uid)
  {
    if(customers[uid] != null)
    {
      return customers[uid];
    }
    else
    {
      throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
    }
  }
  static all(){
    return customers["c123"];
  }

  static update(uid, data)
  {
    if(customers[uid] != null)
    {
      const customer = customers[uid];

      Object.assign(customer, data);
    }
    else
    {
      throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
    }
  }

  static delete(uid)
  {
    if(customers[uid] != null)
    {
      delete customers[uid];
    }
    else
    {
      throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
    }
  }

}
let korisnik =new user("123","ivan","stankovic","ivanjoca@gmail.com","12345","koliko21");

console.log(korisnik)
customers["c123"] = korisnik;
// console.log(customers["c1"]);
// UserService.create(korisnik);
counter ++;
module.exports = UserService;

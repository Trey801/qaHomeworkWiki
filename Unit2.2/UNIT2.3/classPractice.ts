class Employee {
    id: number;
    name: string;
    phone: any;
    email: string;

    constructor(id: number, name, string, phone, email: string){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    toString(): string {
        let output =
        `Employee Record ID ${this.id}\n` +
        `Name: ${this.name}` +
        `Contact Information\n` +
        `Phone: ${this.phone}` +
        `\tEmail: $ {this.email}`;
        return output
    }
}

let firstEmployee = new Employee(
    1,
    "Sadie Adler",
    8675309,
    "saide.adler12@test.com"
)
console.log(firstEmployee.toString())
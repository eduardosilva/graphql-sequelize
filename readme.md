# Grapqhl and Sequelize

This is a example about how to start a project using Graphql, NodeJs and Sequelize ORM. All examples were made using [AdventureWorks](https://www.microsoft.com/en-us/download/details.aspx?id=49502) database.


## Table of Content 

1. [Setup](#setup)
1. [Mappings and Configurations](#mappings-and-configurations)
1. [Queries](#queries)
1. [Useful links](#useful-link)

## Setup

* Dowloading SQL Server Adventure Works database - https://www.microsoft.com/en-us/download/details.aspx?id=49502

## Mappings and Configurations

### Focus on Graphql schema not in your database design

> Build your GraphQL schema to express "what" rather than "how". Then you can improve your implementation details without breaking the interface with older clients.
https://graphql.github.io/learn/thinking-in-graphs/#working-with-legacy-data

Your schema model don't need to be just like your database table model, actually I recommend you to design your schema without thinking about the implementation when it's possible.

> When designing APIs, ask yourself, “What if the implementation changes?” A change such as moving the database from SQL to Mongo. Does the API continue to make sense after those changes? This best pratice allows us to prototype quickly, scale easily, and deploy new services without interrupting the client.
https://medium.com/@zavilla90/best-practices-in-designing-graphql-apis-395225bdcd1

For instance:

The Employee has a name as a property but in the Database the name is in the Person table, so I need to improve a solution in my resolver

```typescript
// Employee schema
export const typeDefs = gql`
    ...
    type Employee { 
        id: ID!
        name: String 
        ... 
    }
`;

// Employee Sequelize Mapping
export const EmployeeFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<EmployeeInstance, EmployeeAttributes> => {
    const attributes: SequelizeAttributes<EmployeeAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            primaryKey: true,
            field: 'BusinessEntityID'
        },
        ...
    }

    const Employee = sequelize.define<EmployeeInstance, EmployeeAttributes>('Employee', attributes, { schema: 'HumanResources', freezeTableName: true, timestamps: false, });

    Employee.associate = models => {
        Employee.hasOne(models.Person, { as: 'person', foreignKey: 'BusinessEntityId' })
        ...
    }

    return Employee;
};

// Employee name resolver
export const resolvers = {
    ... 
    Employee: {
        name: async ({ id }: { id: number }) => {
            const person = await personLoader.load(id) as any
            return `${person.firstName} ${person.middleName} ${person.lastName}`
        }
    }
}
```



## Queries

### Use DataLoader

Facebook DataLoader is a generic utility used to abstract request batching and caching. This is a perfect solution to avoid Select N+1 problem. For instance:

#### Example without DataLoader
```typescript
export const resolvers = {
    ... 
    Employee: {
        name: async ({ id }: { id: number }) => {
            //  without dataloader
            const person = await db.Person.find({
                where: { id  }
            }) as any

            return `${person.firstName} ${person.middleName} ${person.lastName}`
        }
    }
}
```

```batch 
Result: N+1 problem !!!
...
[1] Executing (default): SELECT [BusinessEntityID] AS [id], [personType], [nameStyle], [title], [firstName], [middleName], [lastName], [BusinessEntityId] FROM [Person].[Person] AS [Person] WHERE [Person].[BusinessEntityID] = 284;
[1] Executing (default): SELECT [BusinessEntityID] AS [id], [personType], [nameStyle], [title], [firstName], [middleName], [lastName], [BusinessEntityId] FROM [Person].[Person] AS [Person] WHERE [Person].[BusinessEntityID] = 285;
[1] Executing (default): SELECT [BusinessEntityID] AS [id], [personType], [nameStyle], [title], [firstName], [middleName], [lastName], [BusinessEntityId] FROM [Person].[Person] AS [Person] WHERE [Person].[BusinessEntityID] = 286;
...
```

#### Example with DataLoader
```typescript
const personLoader = new DataLoader<number, any[]>(async (ids: number[]): Promise<any[]> => {
    const result = await db.Person.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return result
});

export const resolvers = {
    ... 
    Employee: {
        name: async ({ id }: { id: number }) => {
            const person = await personLoader.load(id) as any
            return `${person.firstName} ${person.middleName} ${person.lastName}`
        }
    }
}
```

```batch
Result: One query for all employees

[1] Executing (default): SELECT [BusinessEntityID] AS [id], [personType], [nameStyle], [title], [firstName], [middleName], [lastName], [BusinessEntityId] FROM [Person].[Person] AS [Person] WHERE [Person].[BusinessEntityID] IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290);
```



## Useful links:

* [Graphql official documentation](https://graphql.org/learn/)
* [Apollo official documentation](https://www.apollographql.com/docs/?no-cache=1)
* [Dataloader official documentation](https://github.com/facebook/dataloader)
* [Modularizing your GraphQL schema code](https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2)
* [Using DataLoader to batch requests](https://medium.com/@gajus/using-dataloader-to-batch-requests-c345f4b23433)
* [So you want to use Typescript with Sequelize?](https://vivacitylabs.com/setup-typescript-sequelize/)
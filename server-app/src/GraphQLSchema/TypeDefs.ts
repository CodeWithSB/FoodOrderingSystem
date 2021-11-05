const { gql } = require('apollo-server-express');

export const typeDefs = gql`
    #Model types
    type User {
      id: Int
      userName: String
      password: String
      roles: String
    }

    type LoginResponse {
      accessToken: String,
      user: User
    }

    type Item{
      itemID: String
      name: String
      description: String
      price: String
      image: String
      itemType: ItemType
    }

    type ItemType {
      itemTypeID: String
      itemType: String
      inStoreOnly: Boolean
      items: [Item]
    }
    
    type OrderResult{
      confirmationID: String
    }

    type Orders{
      orderDetailsID: String
      orderName: String
      orderDateTime: String
      quantity: Int
      status: String
      total: String
    }

    input ItemInput{
      itemID: String
      name: String
      description: String
      price: String
      image: String
      itemType: String
    }

    input OrderedItem{
      orderedItemID: Int
      item: ItemInput
      specialInstructions: String
    }

    input Billing{
      billingID: Int
      nameOnCard: String
      cardNumber: String
      expirationMonth: String
      expirationYear: String
      cvv: String
      subtotal: String
      tax: String
      total: String
    }

    input PickupDetails{
      name: String
      phoneNumber: String
    }

    input OrderDetails{
      orderName: String
      orderDateTime: String
      quantiy: Int
      status: String
      cartItems: [OrderedItem]
      billing: Billing
      pickupDetails: PickupDetails
    } 

    input OrderView{
      orderDetailsID: String
      orderName: String
      orderDateTime: String
      quantity: Int
      status: String
      total: String
    }

    #Queries
    type Query {
      getAllUsers: [User]
      getUserById: User
      itemInventory: [ItemType]
      orders(userID:Int, startDate:String, endDate:String): [Orders]
    }

    #Mutations
    type Mutation {
      register(userName:String, password:String): Boolean

      login(userName:String, password:String): LoginResponse

      logout: Boolean

      insertOrder(orderDetails: OrderDetails): OrderResult

      updateOrder(order: OrderView): Boolean
    }
  `;

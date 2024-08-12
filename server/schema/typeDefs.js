const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  isAdmin: Boolean
  createdAt: String
  clockedIn: Boolean
  clockedInTime: String
  profilePicture: String
}

type TimeOffRequest {
  _id: ID
  userId: User
  startDate: String
  endDate: String
  status: String
  createdAt: String
  notes: String
}

type Post {
  _id: ID
  description: String!
  image: String!
  postAuthor: String
  createdAt: String
  comments: [Comment]
  category: Category
}

type Category {
  _id: ID
  name: String
}

type Thought {
  _id: ID
  thoughtText: String
  thoughtAuthor: String
  createdAt: String
  comments: [Comment]!
}

type ThoughtComment {
  _id: ID
  commentText: String
  createdAt: String
}

type Comment {
  _id: ID
  commentText: String
  commentAuthor: String
  createdAt: String
}

type Query {
  users: [User]
  user(username: String!): User
  posts(username: String): [Post]
  post(postId: ID!): Post
  me: User
  categories: [Category]
  thoughts: [Thought]!
  thought(thoughtId: ID!): Thought
  logs: [Log]
  userLogs(userId: ID!): [Log]
  timeOffRequests: [TimeOffRequest]
  userTimeOffRequests(userId: ID!): [TimeOffRequest]
}

type Auth {
  token: ID
  user: User
}

type Log {
    _id: ID
    userId: User
    action: String
    timestamp: String
  }



type Mutation {
  addLog(userId: ID!, action: String!): Log
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPost(description: String!, image: String!, category: ID!): Post
  addComment(postId: ID!, commentText: String!): Post
  removePost(postId: ID!): Post
  removeComment(postId: ID!, commentId: ID!): Post
  addThought(thoughtText: String!, thoughtAuthor: String!): Thought
  addThoughtComment(thoughtId: ID!, commentText: String!): Thought
  removeThought(thoughtId: ID!): Thought
  removeThoughtComment(thoughtId: ID!, commentId: ID!): Thought
  clockIn(userId: ID!): User
  clockOut(userId: ID!): User
  requestTimeOff(userId: ID!, startDate: String!, endDate: String!, notes: String!): TimeOffRequest
  updateTimeOffRequestStatus(requestId: ID!, status: String!): TimeOffRequest
  updateProfilePicture(userId: ID!, profilePicture: String!): User
}
`;

module.exports = typeDefs
const { gql } = require('apollo-server-koa')

const schema = gql`
scalar Date

directive @auth on FIELD_DEFINITION
`

module.exports = { schema }
## Apollo GraphQL

`Apollo` is a GraphQL client for React. It is a library that allows you to query and mutate data in your GraphQL server.

```js
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
      <Main />
  </ApolloProvider>
)
```

- `Query with params`, error handling and pending state 
```js
import { gql, useQuery } from "@apollo/client";

// Request id from the query to optimize the query, when category changes
const ALL_NOTES_QUERY = gql`
  query GetAllNotes($categoryId: String) {
    notes(categoryId: $categoryId) {
      id
      content
      category {
        id
        label
      }
    }
  }
`

export function NoteList({category}) {
  const { data, loading, error } = useQuery(ALL_NOTES_QUERY, {
    variables: {
      categoryId: category
    },
    fetchPolicy: "cache-and-network", // no-cache
    errorPolicy: "all",
  });

  return (
    <div>Display Notes</div>
  )
}
```

- `Retry queries after an error`, possible network error and network restores after a brief moment
```js
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink, from } from '@apollo/client'
import {RetryLink} from '@apollo/client/link/retry'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: 2000,
    jitter: false,
  },
  // attempts: {
  //   max: 3,
  //   retryIf: (error, _operation) => !!error
  // }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([retryLink, httpLink]),
})

const App = () => (
  <ApolloProvider client={client}>
      <Main />
  </ApolloProvider>
)
```

- `Mutations`
```js
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EditNoteUi } from "./edit-note-ui";

const GET_NOTE = gql`
  query GetNote($id: String!) {
    note(id: $id) {
      id
      content
    }
  }
`

export function EditNote() {
  let { noteId } = useParams();

  const { data } = useQuery(GET_NOTE, {
    variables: {
      id: noteId
    }
  })

  const [updateNote, {loading}] = useMutation(gql`
    mutation UpdateNote($id: String!, $content: String!) {
      updateNote(id: $id, content: $content) {
        successful
        note {
          id
          content
        }
      }
    }
  `)

  return <EditNoteUi isSaving={loading} onSave={newContent => {
    updateNote({
      variables: {
        id: noteId,
        content: newContent
      }
    }).catch(e => console.error(e)) // Catches network errors
  }} note={data?.note} />
}
```

- Deleting an item 
```js
// Returning id from the delete mutaion will not update the cache and does not update the UI
// we need to use refetchQueries to update the cache and the UI
const [deleteNote] = useMutation(gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      successful
    }
  }
`, {
  // Makes a fresh call to backend and could be costly, can be handled by manually modifying the cache
  refetchQueries: ["GetAllNotes"]
  // [{
  //   query: ALL_NOTES_QUERY,
  //   variables: {
  //     categoryId: category
  //   }
  // }]
})
```

- Manually modify the cache to remove the deleted item
```js
const [deleteNote] = useMutation(gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      successful
      note {
        id
      }
    }
  }
`, 
{
  update: (cache, mutationResult) => {
    const deletedNoteId = cache.identify(mutationResult.data.deleteNote)
    cache.modify({
      fields: {
        notes: existingNotes => {
          // const noteIds = existingNotes.map(noteRef => cache.identify(id))
          return existingNotes.filter(noteRef => cache.identify(noteRef) !== deletedNoteId)
        }
      }
    })        
  }
})
```

- Optimistic UI while deleting an item, it removes the item immediately from the UI optimistically,
then updates the cache, if an error occurs in the backend, the UI is reverted to the previous state.
catch the errors of a network error to revert it to previous state in case of network error.
```js
const [deleteNote] = useMutation(gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      successful
      note {
        id
      }
    }
  }
`, 
{
  optimisticResponse: vars => {
    deleteNote: {
      // Add typename to make sure it works properly
      __typename: "DeleteNoteResult",
      successful: true,
      note: {
        __typename: "Note",
        id: vars.id
      }
    }
  },
  update: (cache, mutationResult) => {
    const deletedNoteId = cache.identify(mutationResult.data.deleteNote)
    cache.modify({
      fields: {
        notes: existingNotes =>  existingNotes.filter(noteRef => cache.identify(noteRef) !== deletedNoteId)
      }
    })        
  }
})
```

- Evit deleted item from the cache
```js
  const [deleteNote] = useMutation(gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      successful
      note {
        id
      }
    }
  }
`, 
{
  update: (cache, mutationResult) => {
    const deletedNoteId = cache.identify(mutationResult.data.deleteNote)
    cache.modify({
      fields: {
        notes: existingNotes =>  existingNotes.filter(noteRef => cache.identify(noteRef) !== deletedNoteId)
      }
    })    
    cache.evit({id: deletedNoteId})    
  }
})
```

- `fetchMore` and `merge field policies` to dynamically load more data into a list
```js
const client = new ApolloClient({
  cache: new InMemoryCache({typePolicies: {
    Query: {
      fields: {
        notes: {
          keyArgs: ['categoryId', 'offset', 'limit'],
          merge: (existing = [], incoming) => [
            ...existing,
            ...incoming
          ]
        }
      }
    }
  }}),
  link: from([retryLink, httpLink]),
})

const GET_NOTES = gql`
  query GetNotes($categoryId: String!, $offset: Int, $limit: Int) {
    notes(categoryId: $categoryId, offset: $offset, limit: $limit) {
      id
      content
    }
  }
`

const { data, loading, error, fetchMore } = useQuery(ALL_NOTES_QUERY, {
  variables: {
    categoryId: category,
    offset: 0,
    limit: 5,
  },
  fetchPolicy: "cache-and-network", // no-cache
  errorPolicy: "all",
});

<button onClick={() => fetchMore({variables: {offset: data.notes.length}})}>Load More...</button>
```

- Read field polices to query local client state
```js
import {makeVar} from '@apollo/client'

// Reactive variables
const selectedNoteIds = makeVar([])

// Call this when a note is selected (on clicking a note or special checkbox in the UI)
export function setNoteSelection(noteId, isSelected) {
  if(isSelected) {
    selectedNoteIds([...selectedNoteIds(), noteId]);
  } else {
    selectedNoteIds(selectedNoteIds().filter(selectedNoteId => selectedNoteId !== noteId));
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache({typePolicies: {
    Query: {
      fields: {
        notes: {
          keyArgs: ['categoryId', 'offset', 'limit'],
          merge: (existing = [], incoming) => [
            ...existing,
            ...incoming
          ]
        }
      }
    },
    Note: {
      fields: {
        isSelected: { // client only state
          read: (currentIsSelected, helpers) => {
            const currentNoteId = helpers.readField("id")
            return selectedIds().includes(isSelected)
          }
        }
      }
    }
  }}),
  link: from([retryLink, httpLink]),
})

const GET_NOTE = gql`
  query GetNotes($categoryId: String!, $offset: Int, $limit: Int) {
    notes(categoryId: $categoryId, offset: $offset, limit: $limit) {
      id
      content
      isSelected @client 
    }
  }
`
```

- Cache redirect policies to avoid slow network requests for new queries
```js
const client = new ApolloClient({
  cache: new InMemoryCache({typePolicies: {
    Query: {
      fields: {
        notes: {
          keyArgs: ['categoryId', 'offset', 'limit'],
          merge: (existing = [], incoming) => [
            ...existing,
            ...incoming
          ]
        },
        {
          note: {
            // cache redirect policy
            read: (cachedValue, helpers) => {
              const queriedNoteId = helpers.args.id
              return helpers.toReference({
                id: queriedNoteId,
                __typename: "Note"
              })
            }
          }
        }
      }
    }}
  })
})
```

- Incrementaly migrate from `REST to GraphQL` using `RestLink`, install `apollo-link-rest` package
```js
import {RestLink} from 'apollo-link-rest'

const restLink = new RestLink({
  uri: 'http://localhost:4000/graphql',
  // credentials: 'same-origin',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([retryLink, restLink, httpLink]),
})

const GET_NOTES = gql`
  query GetNotes($categoryId: String!, $offset: Int, $limit: Int) {
    notes(categoryId: $categoryId, offset: $offset, limit: $limit)
    @rest(type: "Note" path: "/notes?categoryId={args.categoryId}&offset={args.offset}&limit={args.limit}") {
      id
      content 
    }
  }
`
// Pass method: "DELETE" to delete a note to @rest()
// @type() annotation required to mention the type of note we are deleting while using @rest
const [deleteNote] = useMutation(gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) 
    @rest(type: "DeleteNote" path: "/notes/id={args.id}", method: "DELETE") {
      successful
      note @type(name: "Note") {
        id
      }
    }
  }
`, {
  refetchQueries: ["GetAllNotes"]
})
```

- `Polling` to keep the queries in sync
```js
const {data} = useQuery(gql``, {pollInterval: 5000})
```

- `Subscribe` to live updates
```js
import {split} from '@apollo/client'
import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from '@apollo/client/utilities'

const webSocketLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const protocolLink = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    // definition.kind === 'OperationDefinition' &&
    return  definition.operation === 'subscription'
    
  },
  webSocketLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([retryLink, restLink, protocolLink]),
})

// Component where you subscribe to live updates
const { data: newNoteData } = useSubscription(gql`
    subscription NewSharedNote($categoryId: String) {
      newSharedNote(categoryId: $categoryId) {
        id
        content
        category {
          id
          label
        }
      }
    }
  `, {
    variables: {
      categoryId: category
    }
  })

  const newNote = newNoteData?.newSharedNote;

  const recentChanges = newNote && (
    <>
      <Text>Recent changes: </Text>
      <UiNote category={newNote.category.label} content={newNote.content}>
      </UiNote>
    </>
  );
```

- Append subscription updates to existing queries
```js
import {useApolloClient} from '@apollo/client'

const ALL_NOTES_QUERY = gql`
  query GetNotes($categoryId: String!, $offset: Int, $limit: Int) {
    notes(categoryId: $categoryId, offset: $offset, limit: $limit) {
      id
      content
      isSelected @client 
      category {
        id
        label
      }
    }
  }
`

const { data, loading, error, subscribeToMore } = useQuery(ALL_NOTES_QUERY, {
  variables: {
    categoryId: category
  },
  fetchPolicy: "cache-and-network", 
  errorPolicy: "all",
});

const client = useApolloClient();

useEffect(() => {
  const unsubscribe = subscribeToMore({
    document: gql`
      subscription NewSharedNote($categoryId: String) {
        newSharedNote(categoryId: $categoryId) {
          id
          content
          category {
            id
            label
          }
        }
      }
    `, {
      variables: {
        categoryId: category
      }
    },
     updateQuery: (previousQueryResult, { subscriptionData }) => {
        const newNote = subscriptionData.data.newSharedNote;
        client.cache.writeQuery({
          query: ALL_NOTES_QUERY,
          data: {
            ...previousQueryResult, // __typename: ....
            notes: [newNote, ...previousQueryResult.notes]
          },
          variables: {
            categoryId: category
          },
          overwrite: true
        });
      }
  })

  return unsubscribe
}, [category])
```

- Sync Apollo cache with local storage, install `apollo3-cache-persist` and `graphql-anywhere` packages
```js
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'

const client = new ApolloClient({
  defaultOptions: {
    // useQuery() uses watchQuery under the hood
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first"
    }
  }
})

persistCache({
  cache: client.cache,
  storage: new LocalStorageWrapper(window.localStorage)
}).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})

// fetch policy can be added to each query or can be defined on client
const { data, loading, error, subscribeToMore } = useQuery(ALL_NOTES_QUERY, {
  variables: {
    categoryId: category
  },
  fetchPolicy: "cache-and-network",
  errorPolicy: "all",
  nextFetchPolicy: "cache-first",
});
```
const action = require("./templates/action.template")
const options = {
  "name": "select subreddit",
  "parameters": [
      { "name": "subreddit", "type": "String", "defaultValue": null }
  ],
  "async": false,
  "imports": []
}

const optionsTwo = {
  "name": "request posts",
  "parameters": [
      { "name": "subreddit", "type": "String", "defaultValue": null }
  ],
  "async": true,
  "promise": "r.getSubreddit(subreddit).getHot();",
  "imports": [
      {
          "location": "../scripts/reddit",
          "exported": [],
          "as": "r"
      }
  ]
}
const code = require("./templates/script.template")
const codeOptions = {
  "name": "reddit",
  "code": "const r=new snoowrap();",
  "imports": [
      {
          "location": "snoowrap",
          "exported": [],
          "as": "snoowrap"
      }
  ]
}

const reducer = require("./templates/reducer.template")
const reducerOptions = {
    "name": "isLoading",
    "defaultState": false,
    "imports": [],
    "actions": [
        {
            "type": "REQUEST_POSTS",
            "async": true,
            "code": {
                "start": "return prevState=>true",
                "finish": "return prevState=>false",
                "success": null,
                "failure": null
            }
        }
    ]
}

const comp = require("./templates/component.template")
const compOptions = {
    "style": false,
    "globals": [],
    "imports": [
        {
            "location": "../post-list",
            "exported": [],
            "as": "PostList"
        },
        {
            "location": "../search",
            "exported": [],
            "as": "Search"
        }
    ],
    "react": {
        "name": "SubredditPage",
        "props": [
            { "name": "subreddit", "type": "String", "defaultValue": null },
            { "name": "posts", "type": "Object", "defaultValue": null },
            { "name": "onSearch", "type": "Function", "defaultValue": null },
            { "name": "isLoading", "type": "Boolean", "defaultValue": null }
        ],
        "code": "return (<div><SearchBar term={subreddit} onSearch={onSearch} isLoading={isLoading} /><PostList posts={posts} /></div>)"
    }
}

const cont = require("./templates/container.template")
const contOptions = {
    "name": "reddit search",
    "component": "subreddit page",
    "mapStateToProps": {
        "parameters": [
            { "name": "subreddit", "type": "String", "defaultValue": null },
            { "name": "posts", "type": "Object", "defaultValue": null },
            { "name": "isLoading", "type": "Boolean", "defaultValue": null }
        ],
        "code": "return{subreddit,posts,isLoading}"
    },
    "mapDispatchToProps": {
        "code": "return{onSearch:(subreddit)=>{dispatch(Actions.requestPosts(subreddit))}};"
    }
}

const page = require("./templates/page.template")
const pageOptions = {
    "style": true,
    "imports": [
        {
            "location": "react-router-dom",
            "exported": [
                { "object": "Link", "as": null }
            ],
            "as": null
        },
        {
            "location": "./Layout",
            "exported": [],
            "as": "Layout"
        },
        {
            "location": "../containers/subreddit-page",
            "exported": [],
            "as": "RedditSearch"
        }
    ],
    "react": {
        "name": "Home",
        "props": [],
        "code": "return (<Layout><RedditSearch /><p>Hello World of React and Webpack! Hot Reloaded :)</p><p><Link to=\"/dynamic\">Navigate to Dynamic Page</Link></p></Layout>)"
    }
}
const toPrint = page(pageOptions)
console.log(toPrint)
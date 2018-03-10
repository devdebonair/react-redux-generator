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
  "code": "const r=new snoowrap({userAgent:\"nodev7.2.1:jiNIOlneh6TvXQ:1.0 (by /u/catalystlive)\",clientId:\"MeEU261ljtCJMg\",clientSecret:\"YQZda7J9vym-9pvT5DlpLPmxd1Y\",username:\"catalystlive\",password:\"kiddollars\"});",
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

const toPrint = reducer(reducerOptions)
console.log(toPrint)
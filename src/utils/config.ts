export const environments = {
  Dev: "http://127.0.0.1:8787",
  Stage: "https://mars-chatbot-staging.keshabmanni22.workers.dev",
  Prod: "https://mars-chatbot-prod.keshabmanni22.workers.dev",
}

export type Environment = keyof typeof environments

export const endpoints = [
  {
    name: "Add with URL",
    method: "POST",
    path: "/knowledgebase/addwithurl",
    inputs: [{ name: "url", type: "text" }],
  },
  {
    name: "Add with Content",
    method: "POST",
    path: "/knowledgebase/addwithcontent",
    inputs: [
      { name: "url", type: "text" },
      { name: "title", type: "text" },
      { name: "textcontent", type: "textarea" },
    ],
  },
  {
    name: "Delete Page",
    method: "DELETE",
    path: "/knowledgebase/deletepage",
    inputs: [{ name: "id", type: "text" }],
  },
  {
    name: "Update Jobs",
    method: "GET",
    path: "/knowledgebase/updatejobs",
    inputs: [],
  },
]


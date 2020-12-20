export async function todoFetch(method, body) {
  // const todoToSave = {
  //   title: "IT ACADEMY",
  //   completed: false,
  // };

  const addResponse = await fetch("http://localhost:3000/posts", {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`Ok with status ${addResponse.status}`);

  const data = await addResponse.json();
  console.log(data);

  const response = await fetch("http://localhost:3000/posts");

  if (!response.ok) {
    console.log(`Error with status ${response.status}`);
    return;
  }

  console.log(`Ok with status ${response.status}`);

  const json = await response.json();
  console.log(json);
}

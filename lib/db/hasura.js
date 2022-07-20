async function queryHasuraGQL(operationsDoc, operationName, variables) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: 'POST',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjU4MzQyNzQ2LCJleHAiOjE2NTg5NDc1ODYsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJub3RiZWsifX0.ZBPwK-bqe1cPflGMMig9UhP2i0S7YCmNkuIPuuPd-O0',
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}

function fetchMyQuery() {
	const operationsDoc = `
    query MyQuery {
        users {
            email
            issuer
            id
            publicAddress
          }
    }
  `;

	return queryHasuraGQL(operationsDoc, 'MyQuery', {});
}

export async function startFetchMyQuery() {
	const { errors, data } = await fetchMyQuery();

	if (errors) {
		console.error(errors);
	}

	console.log(data);
}

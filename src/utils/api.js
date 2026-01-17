export const fetchCategoryData = async (user, categoryRoute) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000/${categoryRoute}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return (await response.json()).data;
};

export const submitFinanceData = async (user, route, data) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const updateFinanceData = async (user, route, data) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000/${route}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};

//Fetch Finance Data (income, expense, saving)
export const fetchData = async (user, url) => {
  const token = await user.getIdToken();
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const response = await data.json();
  return response;
};

export const onDelete = async (user, route) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000/${route}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

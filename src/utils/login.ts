export const login = async (
  server: string,
  username: string,
  password: string,
): Promise<[boolean, string]> => {
  const resp = await fetch(`http://${server}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const { code, msg } = await resp.json();

  return [code === 0, msg];
};

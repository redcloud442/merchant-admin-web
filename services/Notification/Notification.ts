export const SendNotification = async (
  params: {
    mode: "sendToAll" | "sendToUser";
    userIds: string[];
    title: string;
    description: string;
    imageUrl: string[] | undefined;
  },
  token: string
) => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://service-socket.omnixglobal.io"
    }/api/v2/notifications/send`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to submit notification");

  const data = await res.json();

  return data;
};

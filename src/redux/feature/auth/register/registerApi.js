export const registerApi = (builder) =>
    builder.mutation({
        query: (credentials) => ({
            url: "/auth/register/user",
            method: "POST",
            body: { ...credentials },
        }),
    });

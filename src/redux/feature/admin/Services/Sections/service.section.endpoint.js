export const showAllSections = (builder) => {
    return builder.query({
        query: (serviceId) => ({
            url: `api/admin/services/${serviceId}/sections`,
            method: "GET",
        }),
    });
};

export const showOneSection = (builder) => {
    return builder.query({
        query: ({ serviceId, sectionId }) => ({
            url: `api/admin/services/${serviceId}/sections/${sectionId}`,
            method: "GET",
        }),
    });
};

export const createSection = (builder) => {
    return builder.mutation({
        query: ({ serviceId, body }) => ({
            url: `api/admin/services/${serviceId}/sections`,
            method: "POST",
            body,
        }),
    });
};

export const updateSection = (builder) => {
    return builder.mutation({
        query: ({ serviceId, sectionId, body }) => ({
            url: `api/admin/services/${serviceId}/sections/${sectionId}`,
            method: "PUT",
            body,
        }),
    });
};

export const deleteSection = (builder) => {
    return builder.mutation({
        query: ({ serviceId, sectionId }) => ({
            url: `api/admin/services/${serviceId}/sections/${sectionId}`,
            method: "DELETE",
        }),
    });
};

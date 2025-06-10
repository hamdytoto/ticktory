import { apiSlice } from '../../../../app/api/apiSlice';
import * as SectionApis from './service.section.endpoint';

export const serviceSectionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        showAllSections: SectionApis.showAllSections(builder),
        showOneSection: SectionApis.showOneSection(builder),
        createSection: SectionApis.createSection(builder),
        updateSection: SectionApis.updateSection(builder),
        deleteSection: SectionApis.deleteSection(builder),
    }),
});
export const {
    useShowAllSectionsQuery,
    useShowOneSectionQuery,
    useCreateSectionMutation,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
} = serviceSectionSlice;
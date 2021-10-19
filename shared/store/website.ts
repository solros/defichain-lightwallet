import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AnnouncementData } from '@shared-types/website'

export const websiteSlice = createApi({
  reducerPath: 'website',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://wallet.defichain.com/api/v0'
  }),
  endpoints: builder => ({
    getAnnouncements: builder.query<AnnouncementData[], any>({
      query: () => ({
        url: '/announcements',
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          mode: 'no-cors'
        }
      })
    })
  })
})

export const { useGetAnnouncementsQuery } = websiteSlice
export enum BlogStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export const BlogStatusOptions = [
  { label: 'Draft', value: BlogStatus.Draft },
  { label: 'Published', value: BlogStatus.Published },
  { label: 'Archived', value: BlogStatus.Archived },
]

export enum SelectedSite {
  All = 'all',
  HolidayDeals = 'holiday-deals',
  LuxuryTravel = 'luxury-travel',
}

export const SelectedSiteOptions = [
  { label: 'All', value: SelectedSite.All },
  { label: 'Holiday Deals', value: SelectedSite.HolidayDeals },
  { label: 'Luxury Travel', value: SelectedSite.LuxuryTravel },
]

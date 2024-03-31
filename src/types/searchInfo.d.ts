import type { Res } from '@/types/http'

type SearchHotCitysData = [string, string, string][]

export type SearchHotCitysRes = Res<SearchHotCitysData>

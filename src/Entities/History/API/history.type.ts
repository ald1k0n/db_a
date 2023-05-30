import { ICommand, IHistory, IPerson, IUser } from "Shared";

export interface HistoryByIDRequest {
  id: string;
  sort?: number;
  page?: number;
  pageSize?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
}

export interface ListMetadata {
  current_page: number;
  page_size: number;
  first_page: number;
  last_page: number;
  total_records: number;
}

export interface ReportResponse {
  history: IHistory;
  command: ICommand;
  people: IPerson[];
  peopleMetadata: ListMetadata;
  user: IUser;
}

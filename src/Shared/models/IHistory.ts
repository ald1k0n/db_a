import { notificationMethod } from "../lib";

export interface IHistory {
  id: string;
  createdAt: string;
  userId: string;
  commandId: string;
  commandName: string;
  isActive: boolean;
  historyNumber: number;
  userLogin: string;
  history: any[];
  userEmail: string;
  notificationMethod: notificationMethod;
  notificationTime: string;

  statisctics: {
    totalCalls: number;
    successfulCalls: number;
    unSuccessfulCalls: number;
    totalSMS: number;
    successfulSMS: number;
    unSuccessfullSMS: number;
  };
}

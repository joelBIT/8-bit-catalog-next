import { Game, GameRequest } from "@/interfaces/interfaces";
import { getActiveUser } from "./user";

/**
 * Creates a Request in Pending state and sets the active user as submitter. The ID becomes
 * the number of existing requests, no matter which state they are in.
 * 
 * @param game      the submitted game waiting to be processed
 */
export function createRequest(game: Game): void {
    const requests = getAllRequests();

    const request = {
        id: requests.length,
        game: game,
        submitter: getActiveUser(),
        submitted: new Date().toJSON().slice(0, 10),
        status: "Pending"
    }

    requests.push(request);
    storeAllRequests(requests);
}

export function getAllPendingRequests(): GameRequest[] {
    return getAllRequests().filter(request => request.status === 'Pending');
}

export function getAllProcessedRequests(): GameRequest[] {
    return getAllRequests().filter(request => request.status === 'Denied' || request.status === 'Accepted');
}

export function getAllPendingRequestsForUser(username: string): GameRequest[] {
    return getAllPendingRequests().filter(request => request.submitter.username === username);
}

export function getAllProcessedRequestsForUser(username: string): GameRequest[] {
    return getAllProcessedRequests().filter(request => request.submitter.username === username);
}

export function updateRequest(updatedRequest: GameRequest): void {
    const requests = getAllRequests().filter(request => request.id !== updatedRequest.id);
    requests.push(updatedRequest);
    storeAllRequests(requests);
}

export function getAllRequests(): GameRequest[] {
    return JSON.parse(localStorage.getItem('requests') || '[]');
}

export function storeAllRequests(requests: GameRequest[]): void {
    localStorage.setItem('requests', JSON.stringify(requests));
}

export function getRequest(id: number): GameRequest {
    const request = getAllRequests().find(request => request.id === id);

    if (!request) {
        throw new Error(`Could not find request with ID ${id}`);
    }

    return request;
}
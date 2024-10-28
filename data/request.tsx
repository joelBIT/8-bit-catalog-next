'use client';

import { Game, GameRequest } from "@/interfaces/interfaces";


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
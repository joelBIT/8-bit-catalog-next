import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { filtersTable } from './schema/filters';





/**
 * Retrieves all game categories.
 */
export async function getAllCategories(): Promise<string[]> {
    try {
        const response = await databaseClient.select({"categories": filtersTable.categories}).from(filtersTable);
        return response[0].categories;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Retrieves all game developers.
 */
export async function getAllDevelopers(): Promise<string[]> {
    try {
        const response = await databaseClient.select({"developers": filtersTable.developers}).from(filtersTable);
        return response[0].developers;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Retrieves all game publishers.
 */
export async function getAllPublishers(): Promise<string[]> {
    try {
        const response = await databaseClient.select({"publishers": filtersTable.publishers}).from(filtersTable);
        return response[0].publishers;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Updates the Category search-filter values.
 */
export async function updateCategoryFilter(values: string[]): Promise<void> {
    await databaseClient.update(filtersTable).set({ categories: values }).where(eq(filtersTable.id, 1));
}

/**
 * Updates the Publisher search-filter values.
 */
export async function updatePublisherFilter(values: string[]): Promise<void> {
    await databaseClient.update(filtersTable).set({ publishers: values }).where(eq(filtersTable.id, 1));
}

/**
 * Updates the Developer search-filter values.
 */
export async function updateDeveloperFilter(values: string[]): Promise<void> {
    await databaseClient.update(filtersTable).set({ developers: values }).where(eq(filtersTable.id, 1));
}
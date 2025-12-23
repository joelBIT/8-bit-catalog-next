import 'server-only';

import { databaseClient, FILTERS_TABLE } from './db';



/******************
 * SEARCH FILTERS *
 ******************/

/**
 * Retrieves all game categories.
 */
export async function getAllCategories(): Promise<string[]> {
    const { error, data } = await databaseClient.from(FILTERS_TABLE).select('categories').single();
    if (error) {
        console.log(error);
        return [];
    }

    return data.categories;
}

/**
 * Retrieves all game developers.
 */
export async function getAllDevelopers(): Promise<string[]> {
    const { error, data } = await databaseClient.from(FILTERS_TABLE).select('developers').single();
    if (error) {
        console.log(error);
        return [];
    }

    return data.developers;
}

/**
 * Retrieves all game publishers.
 */
export async function getAllPublishers(): Promise<string[]> {
    const { error, data } = await databaseClient.from(FILTERS_TABLE).select('publishers').single();
    if (error) {
        console.log(error);
        return [];
    }

    return data.publishers;
}

/**
 * Updates the Category search-filter values.
 */
export async function updateCategoryFilter(values: string[]): Promise<void> {
    await databaseClient.from(FILTERS_TABLE).update({ categories: values }).eq('id', 1);
}

/**
 * Updates the Publisher search-filter values.
 */
export async function updatePublisherFilter(values: string[]): Promise<void> {
    await databaseClient.from(FILTERS_TABLE).update({ publishers: values }).eq('id', 1);
}

/**
 * Updates the Developer search-filter values.
 */
export async function updateDeveloperFilter(values: string[]): Promise<void> {
    await databaseClient.from(FILTERS_TABLE).update({ developers: values }).eq('id', 1);
}
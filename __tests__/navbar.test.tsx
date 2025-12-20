import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NavBar } from '@/app/_components/header';
import { URL_DASHBOARD_PAGE, URL_FAVOURITES_PAGE, URL_HOME, URL_LOGIN_PAGE, URL_SEARCH_PAGE, URL_TIMELINE_PAGE } from '@/app/_utils/utils';

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname() {
        return {
            prefetch: () => null
        }
    }
}));

describe('NavBar', () => {
    it('renders navbar links in header when user is not logged in and check if the links are the unauthenticated links', () => {
        render(<NavBar authenticated={false} />)
  
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', URL_HOME);
        expect(links[1]).toHaveAttribute('href', URL_SEARCH_PAGE);
        expect(links[2]).toHaveAttribute('href', URL_FAVOURITES_PAGE);
        expect(links[3]).toHaveAttribute('href', URL_TIMELINE_PAGE);
        expect(links[4]).toHaveAttribute('href', URL_LOGIN_PAGE);
    });

    it('renders navbar links in header when user is logged in and check if the links are the authenticated links', () => {
        render(<NavBar authenticated={true} />)
  
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', URL_HOME);
        expect(links[1]).toHaveAttribute('href', URL_SEARCH_PAGE);
        expect(links[2]).toHaveAttribute('href', URL_FAVOURITES_PAGE);
        expect(links[3]).toHaveAttribute('href', URL_TIMELINE_PAGE);
        expect(links[4]).toHaveAttribute('href', URL_DASHBOARD_PAGE);
    });
});
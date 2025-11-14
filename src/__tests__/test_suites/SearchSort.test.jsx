import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../../components/App'
import '@testing-library/jest-dom'
import { expect, describe, test } from 'vitest'

describe('Sorted Transactions', () => {
    test('filter and sort transaction and the list will update', async () => {
        global.setFetchResponse(global.baseTransactions)
        const { getByPlaceholderText, findAllByTestId } = render(<App />);
        const searchInput = getByPlaceholderText('Search your Recent Transactions');
        fireEvent.change(searchInput, { target: { value: 'ven' } });

        const filteredTransactions = await findAllByTestId('transaction');
        expect(filteredTransactions).toHaveLength(3);
    });
})
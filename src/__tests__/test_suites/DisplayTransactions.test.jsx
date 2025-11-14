import React from 'react'
import { findAllByTestId, render, screen } from '@testing-library/react'
import App from '../../components/App'
import '@testing-library/jest-dom'
import { expect, describe, test } from 'vitest'

describe('Transactions', () => {
    test('display all on startup and verify they contain the correct info', async () =>{
        global.setFetchResponse(global.baseTransactions)
        let { findAllByTestId } = render(<App />);
        const allTransactions = await findAllByTestId('transaction');
        expect(allTransactions).toHaveLength(global.baseTransactions.length)

        const grabDescriptions = await findAllByTestId('tDescription')
        const allDescriptions = grabDescriptions.map((t) => t.textContent)
        const baseDescriptons = global.baseTransactions.map((t) => t.description)
        expect(allDescriptions).toEqual(baseDescriptons);
        
    });
})
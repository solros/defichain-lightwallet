import { LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { render } from '@testing-library/react-native'
import React from 'react'
import { BatchCard } from './BatchCard'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { RootState } from '@store'
import { block } from '@store/block'

jest.mock('@shared-contexts/ThemeProvider')

describe('Batch Card', () => {
  it('should match snapshot', async () => {
    const initialState: Partial<RootState> = {
      block: {
        count: 2000,
        masternodeCount: 10,
        lastSync: 'Tue, 14 Sep 2021 15:37:10 GMT',
        connected: true,
        isPolling: true
      }
    }

    const store = configureStore({
      preloadedState: initialState,
      reducer: { block: block.reducer }
    })

    const vaultId = '92dcef48f0109d007f6csdsjhd2637618739a8d749584e0b732c5b968f54'

    const batch = {
      index: 0,
      collaterals: [
        {
          id: '0',
          amount: '3360.60854727',
          symbol: 'DFI',
          symbolKey: 'DFI',
          name: 'Default Defi token',
          displaySymbol: 'DFI',
          activePrice: {
            id: 'DFI-USD-1386480',
            key: 'DFI-USD',
            isLive: true,
            block: {
              hash: 'af18460c64945121d96fd126bcc22dsfsfs229ada245b0bc33129364b49168346c',
              height: 1386480,
              medianTime: 1637562729,
              time: 1637562731
            },
            active: {
              amount: '2.97565149',
              weightage: 30,
              oracles: {
                active: 3,
                total: 3
              }
            },
            next: {
              amount: '2.98680778',
              weightage: 30,
              oracles: {
                active: 3,
                total: 3
              }
            },
            sort: '001527f0'
          }
        }
      ],
      loan: {
        id: '15',
        amount: '5015.07942533',
        symbol: 'DUSD',
        symbolKey: 'DUSD',
        name: 'Decentralized USD',
        displaySymbol: 'DUSD'
      }
    }

    const rendered = render(
      <Provider store={store}>
        <BatchCard vaultId={vaultId} batch={batch} liquidationHeight={9870} state={LoanVaultState.IN_LIQUIDATION} />
      </Provider>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})

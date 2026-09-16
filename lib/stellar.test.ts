import { describe, expect, it } from 'vitest';
import {
  explorerTxUrl,
  isStellarContractId,
  isStellarPublicKey,
  quoteFee,
  stellar,
} from './stellar';

describe('stellar helpers', () => {
  it('validates G-strkeys', () => {
    expect(
      isStellarPublicKey('GDZST3XVCDTUJ76ZAV2HA72KYFL3JCPBHQ4PXESVXHMZQ5MDDG2WXYUP')
    ).toBe(true);
    expect(isStellarPublicKey('GXXXXXXXX')).toBe(false);
  });

  it('validates C-strkeys', () => {
    expect(
      isStellarContractId('CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4')
    ).toBe(true);
  });

  it('quotes fees with cap', () => {
    expect(quoteFee(10_000, 20, 100)).toBe(20);
    expect(quoteFee(10_000, 20, 10)).toBe(10);
  });

  it('skips explorer links for pending hashes', () => {
    expect(explorerTxUrl('pending_abc')).toBe('');
    expect(stellar.horizonUrl).toContain('horizon');
  });
});

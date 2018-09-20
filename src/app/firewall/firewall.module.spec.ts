import { FirewallModule } from './firewall.module';

describe('FirewallModule', () => {
  let firewallModule: FirewallModule;

  beforeEach(() => {
    firewallModule = new FirewallModule();
  });

  it('should create an instance', () => {
    expect(firewallModule).toBeTruthy();
  });
});

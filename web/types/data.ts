export interface DATA {
  totalEvents: {
    totalEvents: number;
    totalPortnox: number;
    totalDarktrace: number;
    totalImpDam: number;
    totalImpWaf: number;
    totalCheckFw: number;
    totalAdAudit: number;
    totalPaloAlto: number;
    totalCheckHm: number;
    totalCheckFwAtt: number;
  };

  severity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };

  checkpointIndicators: {
    firewall: number;
    antimalware: number;
    antivirus: number;
    antibot: number;
    ransomware: number;
  };

  portnoxIndicators: {
    indicators: {
      dvc_nt_comply: number;
      dvc_unreachable: number;
      dvc_rogue: number;
      mss_ips: number;
    };
    monthly: {
      dvc_nt_comply: number[];
      dvc_unreachable: number[];
      dvc_rogue: number[];
      mss_ips: number[];
    };
  };

  generalActivity: number[];

  incidentResponse: {
    name: string;
    total: number;
  }[];
}

export interface ILastUpdate {
  lastUpdate: string | null;
}

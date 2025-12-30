
export type Side = "left" | "right";

type MilestoneLine = {
  key: string;
  content: React.ReactNode;
  accent?: boolean;
};

export type MilestoneItem = {
  year: string;
  side?: Side;
  lines: MilestoneLine[];
};

export const MILESTONES: MilestoneItem[] = [
  {
    year: "2022",
    lines: [
      {
        key: "2022-1",
        content: (
          <>
            Established as an <span className="accent">MCN Agency</span>
          </>
        ),
      },
    ],
  },
  {
    year: "2023",
    lines: [
      {
        key: "2023-1",
        content: (
          <>
            Strategic Partner with <span className="accent">Shopee</span>
          </>
        ),
      },
    ],
  },
  {
    year: "2024",
    lines: [
      {
        key: "2024-1",
        content: (
          <>
            Strategic partner with <span className="accent">Yeah1 Group</span>{" "}
            for artist management
          </>
        ),
      },
      {
        key: "2024-2",
        content: (
          <>
            Winner of the <span className="accent">Commercial Excellence MCN</span>{" "}
            at the <span className="accent">Shopee Awards</span>
          </>
        ),
      },
    ],
  },
  {
    year: "2025",
    lines: [
      {
        key: "2025-1",
        accent: true,
        content: <>2nd Runner Up Youtube Works Awards 2025</>,
      },
      {
        key: "2025-2",
        content: (
          <>
            Launched <span className="accent">Social Elite</span> as the{" "}
            <span className="accent">Social Commerce Ecosystem</span>
          </>
        ),
      },
    ],
  },
];
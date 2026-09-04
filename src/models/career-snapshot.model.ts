import { Schema, model } from 'mongoose';

const snapshotSchema = new Schema(
  {
    careerId: { type: String, required: true, index: true },
    generatedAt: { type: Date, required: true, index: true },
    version: { type: String, required: true },
    career: { type: Schema.Types.Mixed, required: true },
    players: { type: [Schema.Types.Mixed], default: [] },
    standings: { type: [Schema.Types.Mixed], default: [] },
    topScorers: { type: [Schema.Types.Mixed], default: [] },
    topAssists: { type: [Schema.Types.Mixed], default: [] },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

snapshotSchema.index({ careerId: 1, generatedAt: -1 });

export const CareerSnapshotModel = model('CareerSnapshot', snapshotSchema);

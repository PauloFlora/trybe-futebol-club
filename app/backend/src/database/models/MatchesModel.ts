import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

export default class Matches extends Model {
  public id!: number;

  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awaTeamGoals!: number;

  public inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  home_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  away_team: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  away_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  in_progress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

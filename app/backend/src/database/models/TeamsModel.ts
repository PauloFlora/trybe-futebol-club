import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

export default class Teams extends Model {
  public id!: number;

  public teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'id', as: 'teams' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });

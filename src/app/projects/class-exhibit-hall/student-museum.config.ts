import { classExhibitHallConfig } from './class-exhibit-hall.config';
import { egyptianObjectModels, modelSources } from './egyptian-object-models';
import type { ExhibitProjectConfig } from '../../templates/exhibit-hall/domain/exhibit-types';
import {
  DEFAULT_MUSEUM_ROOM_LAYOUT,
  furnishMuseumRoom,
} from '../../templates/exhibit-hall/rooms/museum-room';
import { museumRoomTemplate } from '../../templates/exhibit-hall/rooms/museum-room-template';

// The teacher assigns rooms in content configuration. Architecture, display positions,
// and the visitor route are fixed; student drafts contain only room contents.
const rooms = classExhibitHallConfig.teams.map((team, index) => ({
  roomId: team.locationId,
  label: `Room ${String(index + 1).padStart(2, '0')}`,
  layoutId: DEFAULT_MUSEUM_ROOM_LAYOUT,
}));
export const studentMuseumConfig: ExhibitProjectConfig = {
  ...classExhibitHallConfig,
  projectVersion: '2.3.0',
  subtitle:
    'Curate your assigned museum room. Add artifacts and write labels, then submit your room for the class museum.',
  template: museumRoomTemplate,
  museum: {
    rooms,
    catalog: {
      objects: egyptianObjectModels,
      sources: modelSources('nefertiti', 'coffin', 'temple'),
    },
  },
  seedBoards: classExhibitHallConfig.seedBoards.map((seed) => {
    const team = classExhibitHallConfig.teams.find((item) => item.id === seed.teamId)!;
    return {
      ...seed,
      data: furnishMuseumRoom(
        seed.data,
        rooms.find((room) => room.roomId === team.locationId)!,
      ),
    };
  }),
};

from random import randrange

class Simulation:
    def __init__(self, doors: int):
        self.doors = doors
    
    def pick_door(self) -> int:
        return randrange(0, self.doors)
    
    def simulate(self, switch: bool) -> bool:
        prize_door = self.pick_door()
        chosen_door = self.pick_door()
        
        closed_doors = list(range(0, self.doors))
        while len(closed_doors) > 2:
            door_to_open = self.pick_door()

            if door_to_open not in closed_doors:
                continue

            if door_to_open not in [prize_door, chosen_door]:
                closed_doors.remove(door_to_open)
        
        if switch:
            chosen_door = sum(closed_doors) - chosen_door

        return chosen_door == prize_door
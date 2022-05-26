from simulation import Simulation


def main():
    doors = 3
    attempts = 1000000

    wins_switch, wins_no_switch = 0, 0

    simulation = Simulation(doors)

    for _ in range(attempts):
        if simulation.simulate(False):
            wins_no_switch += 1

        if simulation.simulate(True):
            wins_switch += 1

    percentage_switch = wins_switch / attempts * 100
    percentage_no_switch = wins_no_switch / attempts * 100

    print(f"    Switching: {wins_switch:,} wins / {attempts:,} attempts ({percentage_switch:.2f}% winning percentage)")
    print(f"Not switching: {wins_no_switch:,} wins / {attempts:,} attempts ({percentage_no_switch:.2f}% winning percentage)")


if __name__ == "__main__":
    main()

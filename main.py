from simulation import Simulation
import sys


def print_error(message):
    print(f"Error: {message}")
    sys.exit(1)


def parse_args():
    args = sys.argv[1:]
    doors = 3
    attempts = 100000

    try:
        args = list(map(int, args))
        if len(args) > 2:
            print_error("too many arguments passed (max 2)")

        doors = args[0]
        if doors < 3:
            print_error("doors argument must be greater than or equal to 3")

        attempts = args[1]
        if attempts < 100:
            print_error("attempts argument must be greater than or equal to 100")
    except ValueError:
        print_error("non-integer arguments passed")
    except IndexError:
        pass

    return doors, attempts


def main():
    doors, attempts = parse_args()
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

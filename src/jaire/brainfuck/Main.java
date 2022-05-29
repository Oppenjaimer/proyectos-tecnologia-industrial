package jaire.brainfuck;

import java.util.Scanner;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final Interpreter interpreter = new Interpreter();

    public static void main(String[] args) {
        if (args.length < 1) {
            while (true) {
                System.out.print("Brainfuck > ");
                String code = scanner.nextLine();

                if (code.equals("ptr")) System.out.printf("ptr: %d%n", interpreter.getPtr());
                if (code.equals("mem")) System.out.printf("mem: %d%n", interpreter.getMem());
                if (code.equals("exit")) break;

                interpreter.interpret(code);
            }
        }
    }
}

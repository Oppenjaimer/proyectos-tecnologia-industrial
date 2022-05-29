package jaire.brainfuck;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Interpreter interpreter = new Interpreter();

        if (args.length < 1) {
            while (true) {
                System.out.print("Brainfuck > ");
                String code = scanner.nextLine();

                if (code.equals("ptr")) System.out.printf("ptr: %d%n", interpreter.getPtr());
                if (code.equals("mem")) System.out.printf("mem: %d%n", interpreter.getMem());
                if (code.equals("exit")) break;

                interpreter.interpret(code);
            }
        } else {
            try {
                String code = Files.readString(Path.of(args[0]));
                interpreter.interpret(code);
            } catch (IOException err) {
                System.out.printf("Error: file '%s' not found%n", args[0]);
            }
        }
    }
}

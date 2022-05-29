package jaire.brainfuck;

import java.util.Scanner;

public class Interpreter {
    private final int LENGTH = 65535;
    private final int[] mem = new int[LENGTH];
    private int ptr = 0;
    private final Scanner scanner = new Scanner(System.in);

    public void interpret(String code) {
        code = code.replaceAll("[^><+\\-.,\\[\\]]", "");

        if (!isBalanced(code)) {
            System.err.println("Error: unmatched brackets");
            return;
        }

        int j = 0;
        for (int i = 0; i < code.length(); i++) {
            char cmd = code.charAt(i);

            switch (cmd) {
                case '>' -> ptr = (ptr == LENGTH - 1) ? 0 : ptr + 1;
                case '<' -> ptr = (ptr == 0) ? LENGTH - 1 : ptr - 1;
                case '+' -> mem[ptr] = unsigned(mem[ptr] + 1);
                case '-' -> mem[ptr] = unsigned(mem[ptr] - 1);
                case '.' -> System.out.print((char) unsigned(mem[ptr]));
                case ',' -> mem[ptr] = unsigned(scanner.next().charAt(0));
                case '[' -> {
                    if (mem[ptr] != 0) continue;

                    i++;
                    while (j > 0 || code.charAt(i) != ']') {
                        if (code.charAt(i) == '[') j++;
                        else if (code.charAt(i) == ']') j--;
                        i++;
                    }
                }
                case ']' -> {
                    if (mem[ptr] == 0) continue;

                    i--;
                    while (j > 0 || code.charAt(i) != '[') {
                        if (code.charAt(i) == ']') j++;
                        else if (code.charAt(i) == '[') j--;
                        i--;
                    }
                    i--;
                }
            }
        }

        if (code.contains(".")) System.out.println();
    }

    private boolean isBalanced(String str) {
        int paired = 0;

        for (int i = 0; i < str.length() && paired >= 0; i++) {
            if (str.charAt(i) == '[') paired++;
            else if (str.charAt(i) == ']') paired--;
        }

        return paired == 0;
    }

    private int unsigned(int signed) {
        return signed & 0xff;
    }

    public int getPtr() {
        return ptr;
    }

    public int getMem() {
        return mem[ptr];
    }
}

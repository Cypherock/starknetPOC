const legacySendCommandTestCases = {
  invalidArgs: [
    {
      command: -1,
      data: '12',
      maxTries: 2,
    },
    {
      command: null,
      data: '12',
      maxTries: 2,
    },
    {
      command: 2,
      data: null,
      maxTries: 2,
    },
    {
      command: undefined,
      data: '12',
      maxTries: 2,
    },
    {
      command: 2,
      data: undefined,
      maxTries: 2,
    },
    {
      command: 2,
      data: '231ss',
      maxTries: 2,
    },
    {
      command: 2,
      data: 'asjhkl',
      maxTries: 2,
    },
    {
      command: 2,
      data: '0x12',
      maxTries: 2,
    },
    {
      command: 2,
      data: '12',
      maxTries: -2,
    },
  ],
  valid: [
    {
      name: '2,1479244f31f2',
      params: {
        command: 2,
        data: '1479244f31f2',
      },
      packets: [
        new Uint8Array([
          170, 2, 12, 0, 1, 0, 1, 20, 121, 36, 79, 49, 242, 207, 71,
        ]),
      ],
      ackPackets: [new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0])],
    },
    {
      name: '63,07120723f102645888a1219a87c196e3b5095062329bfd44de31d52e25107a000a1061062f965cb256ee44a893221be9aec5d57cff',
      params: {
        command: 63,
        data: '07120723f102645888a1219a87c196e3b5095062329bfd44de31d52e25107a000a1061062f965cb256ee44a893221be9aec5d57cff',
      },
      packets: [
        new Uint8Array([
          170, 63, 38, 0, 1, 0, 2, 7, 18, 7, 35, 241, 2, 100, 88, 136, 161, 33,
          154, 135, 193, 150, 227, 181, 9, 80, 98, 50, 155, 253, 68, 222, 49,
          213, 46, 37, 16, 122, 0, 5, 222,
        ]),
        new Uint8Array([
          170, 63, 27, 0, 2, 0, 2, 10, 16, 97, 6, 47, 150, 92, 178, 86, 238, 68,
          168, 147, 34, 27, 233, 174, 197, 213, 124, 255, 32, 26,
        ]),
      ],
      ackPackets: [
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
      ],
    },
    {
      name: '107,0632a1bd4ee626517ae248c5233b61102ce627a848788a4894fa5fd71bc03751d9b40c7945727078aa2d7bd49d6a24cc0dc6b7a9f2aebed52e3ef23444060e285ccd0bb6095ad6296602459a957f16f12543e86131c131fb49e07c409faeb40a62683b40eeba9cbf7b2da1260cba2c5aeb04ebfbb23e041ff41ba00b450e0b9566c8730cbbe2139d8cd34358e347aed2849af5cc9ca85e86e395844ef1bae762ad91abb60832d86e461c632662623b9c11b6d82ffe7df90b62295f6500369b631187e103320d10c6d469d0d20eda1f8b31c2a504fdd77dfbddd42d466eb43272f1327013ffd4f46114772960ca59111e64c293f7988831c3d2af9d5164a5bf3a58ba475f8412538ceafa4734893932279746b792ccf7e624541fbdd473a24f8b98c3aeb8362247eb6ca53ccf76ca8f80096d336e542c0ab9167898814c11f5e7c415456ab35359f9f59e6cdaeed1408d0e976de9e20c8a2c5da0c06f4bb6755cf2c31654d82559c3795785997d3e3e7eac89f404d7663a63f26bfff12e190215e52b5c316774a871500a53d3e6fd8ca12063252c594d7aa6bc53525e04f7220c437305b3eef8a95f7d6be8ef021beaebf7f4975664d2af45893b1b763b52fa5d3280d66adafc34eba7f6f1d24690b7c8f851',
      params: {
        command: 107,
        data: '0632a1bd4ee626517ae248c5233b61102ce627a848788a4894fa5fd71bc03751d9b40c7945727078aa2d7bd49d6a24cc0dc6b7a9f2aebed52e3ef23444060e285ccd0bb6095ad6296602459a957f16f12543e86131c131fb49e07c409faeb40a62683b40eeba9cbf7b2da1260cba2c5aeb04ebfbb23e041ff41ba00b450e0b9566c8730cbbe2139d8cd34358e347aed2849af5cc9ca85e86e395844ef1bae762ad91abb60832d86e461c632662623b9c11b6d82ffe7df90b62295f6500369b631187e103320d10c6d469d0d20eda1f8b31c2a504fdd77dfbddd42d466eb43272f1327013ffd4f46114772960ca59111e64c293f7988831c3d2af9d5164a5bf3a58ba475f8412538ceafa4734893932279746b792ccf7e624541fbdd473a24f8b98c3aeb8362247eb6ca53ccf76ca8f80096d336e542c0ab9167898814c11f5e7c415456ab35359f9f59e6cdaeed1408d0e976de9e20c8a2c5da0c06f4bb6755cf2c31654d82559c3795785997d3e3e7eac89f404d7663a63f26bfff12e190215e52b5c316774a871500a53d3e6fd8ca12063252c594d7aa6bc53525e04f7220c437305b3eef8a95f7d6be8ef021beaebf7f4975664d2af45893b1b763b52fa5d3280d66adafc34eba7f6f1d24690b7c8f851',
      },
      packets: [
        new Uint8Array([
          170, 107, 38, 0, 1, 0, 15, 6, 50, 161, 189, 78, 230, 38, 81, 122, 226,
          72, 197, 35, 59, 97, 16, 44, 230, 39, 168, 72, 120, 138, 72, 148, 250,
          95, 215, 27, 192, 55, 81, 216, 226,
        ]),
        new Uint8Array([
          170, 107, 39, 0, 2, 0, 15, 217, 180, 12, 121, 69, 114, 112, 120, 163,
          58, 45, 123, 212, 157, 106, 36, 204, 13, 198, 183, 169, 242, 174, 190,
          213, 46, 62, 242, 52, 68, 6, 14, 40, 201, 48,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 3, 0, 15, 92, 205, 11, 182, 9, 90, 214, 41, 102, 2,
          69, 154, 149, 127, 22, 241, 37, 67, 232, 97, 49, 193, 49, 251, 73,
          224, 124, 64, 159, 174, 180, 10, 168, 242,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 4, 0, 15, 98, 104, 59, 64, 238, 186, 156, 191, 123,
          45, 161, 38, 12, 186, 44, 90, 235, 4, 235, 251, 178, 62, 4, 31, 244,
          27, 160, 11, 69, 14, 11, 149, 181, 77,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 5, 0, 15, 102, 200, 115, 12, 187, 226, 19, 157, 140,
          211, 67, 88, 227, 71, 174, 210, 132, 154, 245, 204, 156, 168, 94, 134,
          227, 149, 132, 78, 241, 186, 231, 98, 193, 68,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 6, 0, 15, 173, 145, 171, 182, 8, 50, 216, 110, 70,
          28, 99, 38, 98, 98, 59, 156, 17, 182, 216, 47, 254, 125, 249, 11, 98,
          41, 95, 101, 0, 54, 155, 99, 57, 228,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 7, 0, 15, 17, 135, 225, 3, 50, 13, 16, 198, 212, 105,
          208, 210, 14, 218, 31, 139, 49, 194, 165, 4, 253, 215, 125, 251, 221,
          212, 45, 70, 110, 180, 50, 114, 234, 134,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 8, 0, 15, 241, 50, 112, 19, 255, 212, 244, 97, 20,
          119, 41, 96, 202, 89, 17, 30, 100, 194, 147, 247, 152, 136, 49, 195,
          210, 175, 157, 81, 100, 165, 191, 58, 48, 82,
        ]),
        new Uint8Array([
          170, 107, 39, 0, 9, 0, 15, 88, 186, 71, 95, 132, 18, 83, 140, 234,
          250, 71, 52, 137, 57, 50, 39, 151, 70, 183, 146, 204, 247, 230, 36,
          84, 31, 189, 212, 115, 162, 79, 139, 163, 58, 124,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 10, 0, 15, 152, 195, 174, 184, 54, 34, 71, 235, 108,
          165, 60, 207, 118, 202, 143, 128, 9, 109, 51, 110, 84, 44, 10, 185,
          22, 120, 152, 129, 76, 17, 245, 231, 11, 39,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 11, 0, 15, 196, 21, 69, 106, 179, 83, 89, 249, 245,
          158, 108, 218, 238, 209, 64, 141, 14, 151, 109, 233, 226, 12, 138, 44,
          93, 160, 192, 111, 75, 182, 117, 92, 86, 220,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 12, 0, 15, 242, 195, 22, 84, 216, 37, 89, 195, 121,
          87, 133, 153, 125, 62, 62, 126, 172, 137, 244, 4, 215, 102, 58, 99,
          242, 107, 255, 241, 46, 25, 2, 21, 54, 99,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 13, 0, 15, 229, 43, 92, 49, 103, 116, 168, 113, 80,
          10, 83, 211, 230, 253, 140, 161, 32, 99, 37, 44, 89, 77, 122, 166,
          188, 83, 82, 94, 4, 247, 34, 12, 100, 72,
        ]),
        new Uint8Array([
          170, 107, 38, 0, 14, 0, 15, 67, 115, 5, 179, 238, 248, 169, 95, 125,
          107, 232, 239, 2, 27, 234, 235, 247, 244, 151, 86, 100, 210, 175, 69,
          137, 59, 27, 118, 59, 82, 250, 93, 77, 51,
        ]),
        new Uint8Array([
          170, 107, 24, 0, 15, 0, 15, 50, 128, 214, 106, 218, 252, 52, 235, 167,
          246, 241, 210, 70, 144, 183, 200, 248, 81, 223, 216,
        ]),
      ],
      ackPackets: [
        new Uint8Array([170, 1, 1, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
        new Uint8Array([170, 1, 6, 0, 0, 0, 0, 0]),
      ],
    },
  ],
};

export default legacySendCommandTestCases;

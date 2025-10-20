using Webbl.Data.Constants;

namespace Webbl.Data.Types;

public readonly record struct PitchPosition {
  private readonly int _row;
  public required readonly int Row { 
    get { return _row; } 
    init { 
      if (value < 0 || value >= PitchConstants.PITCH_ROWS) {
        throw new ArgumentOutOfRangeException("Row");
      }

      _row = value;
    }
  }

  private readonly int _col;
  public required readonly int Col { 
    get { return _col; } 
    init { 
      if (value < 0 || value >= PitchConstants.PITCH_COLS) {
        throw new ArgumentOutOfRangeException("Col");
      }

      _col = value;
    }
  }
}

